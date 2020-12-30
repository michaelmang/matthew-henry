import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Card from "./Card.js";
import Section from "./Section.js";
import { useWindowSize } from '../hooks.js';

const defaultOffset = 0;
const defaultLimit = 4;
const md = 768; // size of medium breakpoint according to tailwindcss: https://tailwindcss.com/docs/responsive-design
let offset = defaultOffset;

export default function Feed({ commentaries: currentCommentaries, data, getCommentaries, loading }) {
  const size = useWindowSize();

  const [expandedSection, setExpandedSection] = useState(null);

  const expandSection = (id, count) => ({ isReversing = false } = {}) => {
    if (id !== expandedSection) {
      setExpandedSection(id);
      offset = defaultOffset + defaultLimit;
    } else if (isReversing) {
      offset = offset - defaultLimit;
    } else if (offset + defaultLimit > count) {
      offset = defaultOffset;
    } else {
      offset = offset + defaultLimit;
    }

    getCommentaries({
      variables: {
        book_id: id,
        offset,
      },
    });
  };

  const getLimitRange = (id) => expandedSection === id
    ? [offset]
    : [defaultOffset];

  return data.books.map(({ count, id, image, commentaries, name }, idx) => {
    const [currentOffset] = getLimitRange(id);

    let presentation;

    if (currentCommentaries?.length && currentCommentaries.some(commentary => commentary?.book_id === id)) {
      presentation = currentCommentaries;
    } else {
      presentation = commentaries;
    }

    return (
      <Section key={`${id}_${idx}`} title={name}>
        {size.width >= md && currentOffset > defaultOffset && (
          <FontAwesomeIcon
            className={`self-center mr-8 ${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}
            color="white"
            icon={faChevronCircleLeft}
            onClick={() => expandSection(id, count)({ isReversing: true })}
            size="3x"
          />
        )}
        {presentation.map(({ book_chapter, ...rest }) => (
          <Card key={rest.id} {...rest} book_chapter={book_chapter} bookImage={image} book={name} loading={loading}>
            {name} {book_chapter}
          </Card>
        ))}
        {count > defaultLimit && (
          <FontAwesomeIcon
            className={`${size.width < md ? 'ml-2 mb-4' : 'ml-8'} self-center cursor-pointer ${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}
            color="white"
            icon={faChevronCircleRight}
            onClick={expandSection(id, count)}
            size="3x"
          />
        )}
      </Section>
    );
  });
}
