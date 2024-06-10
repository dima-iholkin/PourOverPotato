# Changelog

## [0.28.0] - 2024-06-10

### Added

- Added the latest/earliest recipe info to the `CoffeeBeansCard`.
- Added the logic to sort `CoffeeBeans` by more/less recipes.
- Added a secondary sort order for `Recipes` and `CoffeeBeans`.
- Added the `CHANGELOG.md` file.
  - Added a link to the `CHANGELOG.md` on the `/other` page.
- Added the `files.exclude` for VS Code's File Explorer settings.

### Changed

- Changed the dates' display to show the month's name.
- Migrated to the DB schema v3. 
  - Archived the v2 version of the core and DB entities.
  - Made the Recipe's `favorite` field mandatory.
  - Migrated to the `softDeletionTimestamp` field.
  - Added the indexes on `softDeletionTimestamp` field.
  - Added `EnhancedCoffeeBeans` table.
  - Added the logic to regenerate the `EnhancedCoffeeBeans` items when needed.
  - Updated the DB CRUD logic for `CoffeeBeans` and `Recipes`.
  - Added the DB migration code.
- Moved the info row to the bottom of `CoffeeBeansCard`.
- Renamed the `add a toast` dev buttons.