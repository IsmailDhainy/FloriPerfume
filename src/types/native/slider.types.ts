export type Slider = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

export type SliderTableType = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type SliderTableResponseType = SliderTableType[];

export type SliderTableResponseTypeDashboard = {
  data: SliderTableType[];
  count: number;
};

export type SliderResponseType = SliderTableType;
