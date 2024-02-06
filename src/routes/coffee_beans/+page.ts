import { redirect } from "@sveltejs/kit";
import { routes } from "$lib/domain/routes";

export function load() {
  redirect(302, routes.home);
}
