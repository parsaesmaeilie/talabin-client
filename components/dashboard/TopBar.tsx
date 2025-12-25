"use client";

import React from "react";
import { Icon } from "../Icon";

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-icon">
        <Icon name="ticket-star" variant="bulk" size={20} />
        <span className="notification-badge">۳</span>
      </div>

      <div className="top-bar-logo">T</div>

      <div className="top-bar-icon">
        <Icon name="personalcard" variant="linear" size={20} />
      </div>
    </div>
  );
};
