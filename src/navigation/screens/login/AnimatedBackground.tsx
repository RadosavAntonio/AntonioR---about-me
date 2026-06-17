import { getWindowHeight, getWindowWidth, useTheme } from '@antonior/core'
import React, { memo, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

const W = getWindowWidth()
const H = getWindowHeight()

// Tiny transparent-ish anchor; its large coloured boxShadow (spread = orb radius,
// blurRadius = soft edge) is the visible glowing blob.
const ANCHOR = 8
// Orbs "knock" when their centres are within this fraction of (rA + rB), so the
// glows overlap a little before repelling rather than bouncing at the hard radius.
const COLLIDE = 0.72

interface OrbSeed {
  r: number
  x: number
  y: number
  vx: number
  vy: number
  blur: number
  scaleTo: number
  duration: number
}

// Initial positions + velocities (px, px/sec). Velocities vary so the field never
// settles into a pattern. Colours are applied from the theme at render time.
const ORB_SEEDS: OrbSeed[] = [
  { r: W * 0.3, x: W * 0.12, y: H * 0.08, vx: 46, vy: 33, blur: 90, scaleTo: 1.2, duration: 9000 },
  { r: W * 0.26, x: W * 0.92, y: H * 0.4, vx: -37, vy: 52, blur: 90, scaleTo: 1.25, duration: 11000 },
  { r: W * 0.32, x: W * 0.55, y: H * 0.95, vx: 54, vy: -29, blur: 110, scaleTo: 1.18, duration: 13000 },
  { r: W * 0.22, x: W * 0.78, y: H * 0.22, vx: -44, vy: 41, blur: 80, scaleTo: 1.3, duration: 10000 },
]

const AnimatedBackgroundInit = (): React.ReactElement => {
  const { colors, isDark } = useTheme()
  const palette = [colors.primary, colors.accent, colors.secondary, colors.tertiary]
  const oMin = isDark ? 0.4 : 0.18
  const oMax = isDark ? 0.7 : 0.38

  // Position values are driven imperatively each frame (JS driver). `scale` runs a
  // native-driver breathing loop; both feed transforms on separate nested views.
  const anims = useRef(
    ORB_SEEDS.map(s => ({
      x: new Animated.Value(s.x),
      y: new Animated.Value(s.y),
      scale: new Animated.Value(0),
    })),
  ).current

  // Live physics state (mutated in place by the rAF loop).
  const bodies = useRef(
    ORB_SEEDS.map(s => ({ x: s.x, y: s.y, vx: s.vx, vy: s.vy, r: s.r })),
  ).current

  useEffect(() => {
    const loops = anims.map((a, i) => {
      const loop = Animated.loop(
        Animated.timing(a.scale, {
          toValue: 1,
          duration: ORB_SEEDS[i].duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      )
      loop.start()
      return loop
    })

    let raf = 0
    let lastT: number | null = null

    const step = (t: number) => {
      if (lastT === null) {
        lastT = t
      }
      let dt = (t - lastT) / 1000
      lastT = t
      if (dt > 0.05) {
        dt = 0.05 // clamp after a stall so nothing teleports
      }

      // Integrate + bounce off the screen edges (centre travels [0, W] × [0, H],
      // so the glow hugs and spills past each edge at the extremes).
      for (const o of bodies) {
        o.x += o.vx * dt
        o.y += o.vy * dt
        if (o.x < 0) {
          o.x = 0
          o.vx = Math.abs(o.vx)
        } else if (o.x > W) {
          o.x = W
          o.vx = -Math.abs(o.vx)
        }
        if (o.y < 0) {
          o.y = 0
          o.vy = Math.abs(o.vy)
        } else if (o.y > H) {
          o.y = H
          o.vy = -Math.abs(o.vy)
        }
      }

      // Elastic collisions between every pair (equal mass: exchange the velocity
      // component along the contact normal, then separate the overlap).
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i]
          const b = bodies[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d2 = dx * dx + dy * dy
          const minD = (a.r + b.r) * COLLIDE
          if (d2 > 0.0001 && d2 < minD * minD) {
            const d = Math.sqrt(d2)
            const nx = dx / d
            const ny = dy / d
            const overlap = (minD - d) / 2
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap
            const v1n = a.vx * nx + a.vy * ny
            const v2n = b.vx * nx + b.vy * ny
            const diff = v2n - v1n
            a.vx += diff * nx
            a.vy += diff * ny
            b.vx -= diff * nx
            b.vy -= diff * ny
          }
        }
      }

      for (let k = 0; k < bodies.length; k++) {
        anims[k].x.setValue(bodies[k].x)
        anims[k].y.setValue(bodies[k].y)
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      loops.forEach(l => l.stop())
    }
  }, [anims, bodies])

  return (
    <View
      pointerEvents="none"
      style={[styles.container, { backgroundColor: colors.background }]}>
      {ORB_SEEDS.map((s, i) => {
        const a = anims[i]
        const scale = a.scale.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, s.scaleTo, 1],
        })
        const opacity = a.scale.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [oMin, oMax, oMin],
        })
        return (
          <Animated.View
            key={i}
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: [{ translateX: a.x }, { translateY: a.y }],
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                left: -ANCHOR / 2,
                top: -ANCHOR / 2,
                width: ANCHOR,
                height: ANCHOR,
                borderRadius: ANCHOR / 2,
                backgroundColor: palette[i],
                boxShadow: [
                  {
                    offsetX: 0,
                    offsetY: 0,
                    blurRadius: s.blur,
                    spreadDistance: s.r,
                    color: palette[i],
                  },
                ],
                opacity,
                transform: [{ scale }],
              }}
            />
          </Animated.View>
        )
      })}
    </View>
  )
}

export const AnimatedBackground = memo(AnimatedBackgroundInit)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
})
