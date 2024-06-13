import React, { CSSProperties } from "react";

interface LoadingScreenProps {
  style?: CSSProperties;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ style }) => (
  <div className="loading-screen" style={style}>
    loading...
  </div>
);
