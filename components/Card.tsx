import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Title: React.FC<CardTitleProps>;
  Subtitle: React.FC<CardSubtitleProps>;
  Body: React.FC<CardBodyProps>;
} = ({ children, className = "", hover = true, ...props }) => {
  const classes = ["card", className].filter(Boolean).join(" ");

  return <div className={classes} {...props}>{children}</div>;
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "", ...props }) => {
  const classes = ["card-header", className].filter(Boolean).join(" ");
  return <div className={classes} {...props}>{children}</div>;
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "", ...props }) => {
  const classes = ["card-title", className].filter(Boolean).join(" ");
  return <h3 className={classes} {...props}>{children}</h3>;
};

const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className = "", ...props }) => {
  const classes = ["card-subtitle", className].filter(Boolean).join(" ");
  return <p className={classes} {...props}>{children}</p>;
};

const CardBody: React.FC<CardBodyProps> = ({ children, className = "", ...props }) => {
  const classes = ["card-body", className].filter(Boolean).join(" ");
  return <div className={classes} {...props}>{children}</div>;
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
