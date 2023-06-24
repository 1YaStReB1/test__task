export interface VideoJsPlayerOptions {
  autoplay: boolean;
  controls: boolean;
  sources: [
    {
      src: String;
      type: String;
    }
  ];
}