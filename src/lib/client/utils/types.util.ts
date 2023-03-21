export type EventChangeInput = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export interface CarouselItem {
  imageUrl: string;
  title: string;
}
