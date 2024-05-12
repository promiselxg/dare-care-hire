"use client";

import { __ } from "./getElementById";
export function acceptNumbersOnly(el) {
  if (typeof window !== "undefined" && window.document) {
    var tf = __(el);
    tf.value = tf.value.replace(/[^0-9]/g, "");
  }
}
