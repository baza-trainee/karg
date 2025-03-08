"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ContactLinksProvider } from "@/app/contactLinksProvider";

export function Providers({ children }) {
  return (
    <ChakraProvider>
      <ContactLinksProvider>
        {children}
      </ContactLinksProvider>
    </ChakraProvider>);
}
