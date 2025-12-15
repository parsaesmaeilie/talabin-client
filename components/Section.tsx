import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> & {
  Header: React.FC<SectionHeaderProps>;
  Title: React.FC<SectionTitleProps>;
  Subtitle: React.FC<SectionSubtitleProps>;
} = ({ children, className = "", id, ...props }) => {
  const classes = ["section", className].filter(Boolean).join(" ");

  return (
    <section className={classes} id={id} {...props}>
      <div className="container">{children}</div>
    </section>
  );
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ children, className = "" }) => {
  const classes = ["section-header", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => {
  const classes = ["section-title", className].filter(Boolean).join(" ");
  return <h2 className={classes}>{children}</h2>;
};

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({ children, className = "" }) => {
  const classes = ["section-subtitle", className].filter(Boolean).join(" ");
  return <p className={classes}>{children}</p>;
};

Section.Header = SectionHeader;
Section.Title = SectionTitle;
Section.Subtitle = SectionSubtitle;
