import React from "react";
import PropTypes from "prop-types";
import { HeartPulse } from "lucide-react"; // pulse heart icon

export default function HeartbeatLogo({ size = 32 }) {
  return (
    <div className="flex items-center gap-2">
      <HeartPulse
        size={size}
        className="text-red-600 dark:text-red-400 animate-pulse"
      />
      <span className="font-bold text-xl text-gray-800 dark:text-white">
        MedixHub
      </span>
    </div>
  );
}

HeartbeatLogo.propTypes = {
  size: PropTypes.number,
};
