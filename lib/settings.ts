import { supabase } from "./supabase";
import type { ConfiguracionTienda } from "@/types/database";

export async function getStoreSettings() {
  const { data, error } = await supabase
    .from("configuracion_tienda")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) return null;
  return data as unknown as ConfiguracionTienda;
}
