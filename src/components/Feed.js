import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Card from "./Card.js";
import Section from "./Section.js";
import { useWindowSize } from '../hooks.js';

const defaultOffset = 0;
const defaultLimit = 4;
const md = 768; // size of medium breakpoint according to tailwindcss: https://tailwindcss.com/docs/responsive-design

export default function Feed({ commentaries: currentCommentaries, data, getCommentaries }) {
  const size = useWindowSize();
  
  const [offset, setOffset] = useState(defaultOffset);
  const [expandedSection, setExpandedSection] = useState(null);

  const expandSection = (id) => ({ isReversing = false } = {}) => {
    let newOffset;

    if (id !== expandedSection) {
      setExpandedSection(id);
      newOffset = defaultOffset + defaultLimit;
    } else if (isReversing) {
      newOffset = offset - defaultLimit;
    } else {
      newOffset = offset + defaultLimit;
    }

    setOffset(newOffset);
    getCommentaries({
      variables: {
        book_id: id,
        offset: newOffset,
      },
    });
  };

  const getLimitRange = (id) => expandedSection === id
    ? [offset]
    : [defaultOffset];

  return data.books.map(({ id, image, commentaries, name }) => {
    const [currentOffset] = getLimitRange(id);

    let presentation;

    if (currentCommentaries?.length && currentCommentaries.some(commentary => commentary?.book_id === id)) {
      presentation = currentCommentaries;
    } else {
      presentation = commentaries;
    }

    return (
      <Section key={id} title={name}>
        {presentation.map(({ book_chapter, ...rest }) => (
          <Card key={rest.id} {...rest} book_chapter={book_chapter} bookImage={image} book={name}>
            {name} {book_chapter}
          </Card>
        ))}
        <div className="flex flex-col h-full justify-center items-center" style={{ height: 450 }}>
          <FontAwesomeIcon
            className={`${size.width < md ? 'mr-2 mb-4' : 'ml-8 mb-4'} cursor-pointer`}
            color="white"
            icon={faPlus}
            onClick={expandSection(id)}
            size="3x"
          />
          {currentOffset > defaultOffset && (
            <FontAwesomeIcon
              className={`${size.width < md ? 'ml-2 mb-8' : 'ml-8 mb-8'} cursor-pointer`}
              color="white"
              icon={faMinus}
              onClick={() => expandSection(id)({ isReversing: true })}
              size="3x"
            />
          )}
        </div>
      </Section>
    );
  });
}
