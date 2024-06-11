# Changelog

## [0.28.0] - 2024-06-11

### Added

- Added the latest/earliest recipe info to the `CoffeeBeansCard`.
- Added the logic to sort `CoffeeBeans` by more/less recipes.
- Added a secondary sort order for `Recipes` and `CoffeeBeans`.
- Added the `files.exclude` for VS Code's File Explorer settings.
- Added the `CHANGELOG.md` file.
  - Added a link to the `CHANGELOG.md` on the `/other` page.

### Changed

- Changed the dates' display to show the month name.
- Moved the info row to the bottom of `CoffeeBeansCard`.
- Migrated to the DB schema v3. 
  - Archived the v2 version of the core and DB entities.
  - Made the Recipe's `favorite` field mandatory.
  - Migrated to the `softDeletionTimestamp` field.
  - Added the indexes on `softDeletionTimestamp` field.
  - Added `EnhancedCoffeeBeans` table.
  - Added the logic to regenerate the `EnhancedCoffeeBeans` items when needed.
  - Updated the DB CRUD logic for `CoffeeBeans` and `Recipes`.
  - Added the DB migration code.
- Made the `delete all data` button actually delete the DB from the browser, rather than only clearing the object stores.
- Improved the folder structure by moving many files around.
- Improved the `database` folder codebase.
- Changed the `Enable persistent storage` button's copy.
- Renamed the `add a toast` dev buttons.

### Fixed

- Fixed the link color on the `/other` page.