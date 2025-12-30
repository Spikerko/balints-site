"use client";

import { useTranslation } from "react-i18next";
import { Fragment, type ReactNode } from "react";

export default function I18NText({
  text,
  components = [],
}: {
  text: string;
  components?: ReactNode[];
}) {
  const { t } = useTranslation();
  const translated = t(text);

  const parts = translated.split("{i}");

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 && components[index]}
        </Fragment>
      ))}
    </>
  );
}