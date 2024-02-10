import type { CoffeeBeans } from "$lib/domain/entities/CoffeeBeans";

export type EnhancedCoffeeBeans = CoffeeBeans & { recipeCount: number; latestRecipeTimestamp: Date | undefined }