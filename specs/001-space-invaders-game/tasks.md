# Tasks: Space Invaders Game

**Input**: Design documents from `/specs/001-space-invaders-game/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize React project using Vite in root directory
- [X] T002 Install dependencies with npm install
- [X] T003 Add GitHub Pages deployment with gh-pages package
- [X] T004 Configure vite.config.js with correct base path for GitHub Pages
- [X] T005 Create folder structure: src/game, src/components, public/assets

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create GameCanvas component with <canvas> ref in src/components/GameCanvas.jsx
- [X] T007 Implement game loop using requestAnimationFrame in src/game/GameLoop.js
- [X] T008 Implement update() and render() functions in src/game/GameEngine.js
- [X] T009 Implement keyboard input hooks in src/game/InputHandler.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Gameplay (Priority: P1) 🎯 MVP

**Goal**: Player can control a ship, move horizontally, shoot projectiles, see enemies moving in grid, detect collisions resulting in enemy destruction, track score, and experience game over.

**Independent Test**: Start the game, move player left/right, shoot enemies, observe score increases and game over when enemies reach bottom.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create Player class/module in src/game/entities/Player.js
- [X] T011 [US1] Implement horizontal movement and shot firing in src/game/entities/Player.js
- [X] T012 [P] [US1] Create Bullet pool system in src/game/entities/Projectile.js
- [X] T013 [P] [US1] Create Enemy module with grid generation in src/game/entities/Enemy.js
- [X] T014 [US1] Implement enemy movement pattern (side-to-side + descend) in src/game/entities/Enemy.js
- [X] T015 [US1] Add collision detection for bullets vs enemies in src/game/CollisionDetector.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Visual Effects (Priority: P2)

**Goal**: Player experiences animated explosion effects on enemy destruction, particle-based debris bursts, and screen shake on significant events.

**Independent Test**: Destroy enemies and observe explosion animations, particle effects, and screen shake, adding visual polish to basic gameplay.

### Implementation for User Story 2

- [X] T016 [P] [US2] Create ParticleSystem helper in src/game/ParticleEngine.js
- [X] T017 [US2] Add explosion effect on enemy death in src/game/ParticleEngine.js
- [X] T018 [US2] Implement screen shake using camera offset in src/game/GameEngine.js
- [X] T019 [P] [US2] Add frame-blending glow effects in src/game/ParticleEngine.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Game Screens (Priority: P3)

**Goal**: Player sees a start screen before gameplay and can restart the game after game over.

**Independent Test**: View start screen, start game, reach game over, restart, ensuring smooth transitions between game states.

### Implementation for User Story 3

- [X] T020 [P] [US3] Add start screen overlay in src/components/StartScreen.jsx
- [X] T021 [P] [US3] Add game-over overlay in src/components/GameOverScreen.jsx
- [X] T022 [US3] Add score display in src/components/ScoreDisplay.jsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T023 Set correct homepage/base in vite config for deployment
- [ ] T024 Run npm run build to create production bundle
- [ ] T025 Push dist to gh-pages branch for deployment
- [ ] T026 Verify GitHub Pages loads correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1/US2 but independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models for User Story 1 together:
Task: "Create Player class/module in src/game/entities/Player.js"
Task: "Create Bullet pool system in src/game/entities/Projectile.js"
Task: "Create Enemy module with grid generation in src/game/entities/Enemy.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence</content>
<parameter name="filePath">/workspaces/speckit-spaceinvaders/specs/001-space-invaders-game/tasks.md