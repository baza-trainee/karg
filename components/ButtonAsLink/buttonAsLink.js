"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import styles from "./buttonAsLink.module.scss";
import variables from "@/app/[locale]/variables.module.scss";

const ButtonAsLink = ({ route, buttonCaption, buttonStyle }) => {
  const router = useRouter();

  return (
    <button
      className={`${styles[buttonStyle]} ${variables.button1}`}
      onClick={() => router.push(route)}
    >
      <span>{buttonCaption}</span>
    </button>
  );
};

ButtonAsLink.propTypes = {
  route: PropTypes.string,
  buttonCaption: PropTypes.string,
  buttonStyle: PropTypes.string,
};

export default ButtonAsLink;
