import { routes } from "$lib/domain/routes";
import { redirect } from "@sveltejs/kit";

export function load() {
  redirect(302, routes.home);
}