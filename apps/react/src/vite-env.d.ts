/// <reference types="vite/client" />

// type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };

// type CustomElement<T, K extends string> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'lit-counter': CustomElement<LitCounter> & { name: string };
//       'solid-counter': SolidCounter & { name: string };
//       'svelte-counter': SvelteCounter & { name: string };
//     }
//   }
// }
