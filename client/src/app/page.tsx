"use client"
import React from 'react';
import { Page } from "../stories/Pages/";

import {useRouter} from 'next/router'

type User = {
  name: string;
};

export default function Home() {
  const [user, setUser] = React.useState<User>();

  return (
    <main>
      <Page />
    </main>
  )
}
