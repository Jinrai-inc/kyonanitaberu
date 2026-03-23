// Apple MapKit JS type declarations
// These are minimal types for our usage; MapKit JS itself is loaded via <script>

declare namespace mapkit {
  class Map {
    constructor(container: string | HTMLElement, options?: MapConstructorOptions);
    showsUserLocation: boolean;
    showsUserLocationControl: boolean;
    region: CoordinateRegion;
    annotations: Annotation[];
    addAnnotation(annotation: Annotation): void;
    addAnnotations(annotations: Annotation[]): void;
    removeAnnotations(annotations: Annotation[]): void;
    destroy(): void;
  }

  interface MapConstructorOptions {
    center?: Coordinate;
    region?: CoordinateRegion;
    showsCompass?: string;
    showsZoomControl?: boolean;
    showsMapTypeControl?: boolean;
    padding?: Padding;
  }

  class Coordinate {
    constructor(latitude: number, longitude: number);
    latitude: number;
    longitude: number;
  }

  class CoordinateRegion {
    constructor(center: Coordinate, span: CoordinateSpan);
  }

  class CoordinateSpan {
    constructor(latitudeDelta: number, longitudeDelta: number);
  }

  class MarkerAnnotation {
    constructor(coordinate: Coordinate, options?: MarkerAnnotationOptions);
    coordinate: Coordinate;
    data: Record<string, unknown>;
    addEventListener(event: string, handler: (event: AnnotationEvent) => void): void;
  }

  interface MarkerAnnotationOptions {
    color?: string;
    glyphText?: string;
    title?: string;
    subtitle?: string;
    data?: Record<string, unknown>;
    clusteringIdentifier?: string;
  }

  interface AnnotationEvent {
    annotation: MarkerAnnotation;
  }

  class Padding {
    constructor(top: number, right: number, bottom: number, left: number);
  }
}

interface Window {
  mapkit: typeof mapkit;
  initMapKit: () => void;
}
