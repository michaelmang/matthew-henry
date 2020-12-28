import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Card from "./Card.js";
import Section from "./Section.js";
import { useWindowSize } from '../hooks.js';

const defaultOffset = 0;
const defaultLimit = 4;
const md = 768; // size of medium breakpoint according to tailwindcss: https://tailwindcss.com/docs/responsive-design

export default function Feed({ data }) {
  const size = useWindowSize();
  
  const [limit, setLimit] = useState(defaultLimit);
  const [offset, setOffset] = useState(defaultOffset);
  const [expandedSection, setExpandedSection] = useState(null);

  const expandSection = (id) => () => {
    if (id === expandedSection) {
      setOffset(offset + defaultLimit);
      setLimit(limit + defaultLimit);
      return;
    }

    setExpandedSection(id);
    setOffset(defaultOffset);
    setLimit(defaultLimit + defaultLimit);
  };

  const getLimitRange = (id) => expandedSection === id
    ? [offset, limit]
    : [defaultOffset, defaultLimit];

  return data.books.map(({ id, image, name, commentaries }) => {
    const [currentOffset, currentLimit] = getLimitRange(id);
    return (
      <Section key={id} title={name}>
        {commentaries.slice(currentOffset, currentLimit).map(({ book_chapter, ...rest }) => (
          <Card key={rest.id} {...rest} book_chapter={book_chapter} bookImage={image} book={name}>
            {name} {book_chapter}
          </Card>
        ))}
        {commentaries.length > defaultLimit && currentLimit < commentaries.length && (
          <FontAwesomeIcon
            className={`${size.width < md ? 'ml-0 mb-8' : 'ml-8 mb-0'} self-center cursor-pointer`}
            color="white"
            icon={size.width < md ? faChevronDown : faChevronRight}
            onClick={expandSection(id)}
            size="3x"
          />
        )}
      </Section>
    );
  });
}
