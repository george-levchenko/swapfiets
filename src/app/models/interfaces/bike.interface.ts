export interface Bike {
  id: number;
  thumb: string | null;
  large_img: string | null;
  title: string;
  stolen_location: string;
  manufacturer_name: string | null;
  frame_model: string | null;
  frame_colors: string[] | null;
}
