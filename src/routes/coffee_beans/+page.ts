import { redirect } from "@sveltejs/kit";
import { routes } from "$lib/domain/constants/routes";

export function load() {
  redirect(302, routes.home);
}
