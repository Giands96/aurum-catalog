export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  marca: string | null;
  categoria: "perfume" | "reloj";
  imagen_url: string | null;
  imagen_public_id: string | null;
  destacado: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductoVariante {
  id: string;
  producto_id: string;
  presentacion: string;
  precio: number;
  stock: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductoImagen {
  id: number;
  producto_id: string;
  url: string;
  public_id: string;
  orden: number;
  created_at: string;
}

export interface ConfiguracionTienda {
  id: number;
  nombre_tienda: string;
  whatsapp: string;
  mensaje_whatsapp: string;
  instagram_url: string | null;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      productos: {
        Row: Producto;
        Insert: Omit<Producto, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Producto, "id">>;
      };
      producto_variantes: {
        Row: ProductoVariante;
        Insert: Omit<ProductoVariante, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<ProductoVariante, "id">>;
      };
      producto_imagenes: {
        Row: ProductoImagen;
        Insert: Omit<ProductoImagen, "id" | "created_at">;
        Update: Partial<Omit<ProductoImagen, "id">>;
      };
      configuracion_tienda: {
        Row: ConfiguracionTienda;
        Insert: Omit<ConfiguracionTienda, "created_at" | "updated_at">;
        Update: Partial<Omit<ConfiguracionTienda, "id">>;
      };
    };
  };
};
