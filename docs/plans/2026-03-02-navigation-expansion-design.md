# Navigation Expansion: Tabs + Full-Screen Screens

## Context
Expanding the app navigation to support: Home as a feed with card detail, Profile with edit profile, ChatList as a tab, a new Ant tab, and full-screen pushes for Card detail and Edit Profile.

## Navigation Structure

```
RootStack (native stack, no header)
├── Login
├── Tabs (bottom tab navigator)
│   ├── Home tab      → Home (feed with cards)
│   ├── ChatList tab  → ChatList
│   ├── Ant tab       → Ant (placeholder)
│   └── Profile tab   → Profile
├── CardDetail (id)   ← full-screen push, no tabs
├── EditProfile       ← full-screen push, no tabs
└── Chat (id)         ← full-screen push, no tabs
```

## New Screens
- `screens/tabs/ant.tsx` — empty placeholder
- `screens/home/cardDetail.tsx` — receives `{ id: string }`, full-screen
- `screens/profile/editProfile.tsx` — full-screen, no params

## Type Changes (navigationTypes.ts)
- Screens enum: add `ANT`, `CARD_DETAIL`, `EDIT_PROFILE`
- RootStackParams: add `CardDetail: { id: string }`, `EditProfile: undefined`
- TabRoute: add `CHAT_LIST`, `ANT`
- TabList: add ChatList, Ant entries

## globalNavigation Changes
- Add `goToAnt()`, `goToChatList()` as tab navigations
- Add `goToCardDetail(id)`, `goToEditProfile()` as root stack pushes

## Decisions
- Card detail and Edit Profile are full-screen pushes (no tabs visible)
- ChatList moves from root stack to a tab
- Home/Profile tab stacks removed (unnecessary nesting since sub-screens push full-screen)
- Ant tab is a placeholder for future use
