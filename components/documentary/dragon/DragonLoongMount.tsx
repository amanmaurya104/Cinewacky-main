'use client';

import dynamic from 'next/dynamic';

/**
 * three.js and a 3MB model are useless on the server and must not sit on the
 * critical path, so the whole scene is split out and fetched on the client
 * only. `ssr: false` has to be declared from inside a Client Component for the
 * code split to hold, which is the only reason this file exists.
 */
const DragonLoong = dynamic(() => import('./DragonLoong'), { ssr: false });

export default function DragonLoongMount() {
  return <DragonLoong />;
}
