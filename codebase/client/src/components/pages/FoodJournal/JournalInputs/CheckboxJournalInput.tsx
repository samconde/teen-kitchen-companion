import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OptionGroup from 'src/components/layout/Form/OptionGroup';
import Checkbox, {
  StateChangeHandler,
} from 'src/components/layout/Form/Checkbox';
import QuestionInputState from 'src/model/InputState/QuestionInputState';
import JournalInputContext from 'src/context/JournalInput/JournalInputContext';

const CheckboxJournalInput: React.FC<{ question: QuestionInputState }> = ({
  question,
}) => {
  const journalContext = useContext(JournalInputContext);
  if (!journalContext) {
    return <></>;
  }

  const { id, text, isRequired, options } = question;
  if (!options) {
    return <></>;
  }

  const isDanger = () => {
    return (
      isRequired &&
      !question.isAnswered() &&
      journalContext.state.didAttemptSubmit
    );
  };

  const onChange: StateChangeHandler = (
    affectedOption: string,
    newState: boolean
  ) => {
    console.log(
      `Option: ${affectedOption}. ID: ${affectedOption}. New state: ${newState}`
    );

    journalContext.executeQuestionReducer(
      id,
      QuestionInputState.createSetCheckboxOption(affectedOption, newState)
    );
  };

  return (
    <div
      className={`flex flex-col w-full py-7 px-3 mb-7 bg-white xs:px-7 shadow-sm xs:rounded-xl sm:border-[1px] ${
        isDanger() ? 'sm:border-red-600' : 'sm:border-gray-100'
      } md:shadow-lg`}
      id={id}
    >
      <OptionGroup>
        <label className="block font-bold mb-1 text-gray-800">
          {text}
          <span className="text-red-600">{`${isRequired ? ' *' : ''}`}</span>
        </label>

        {options
          ? options.map((opt) => (
              <Checkbox
                key={opt.id}
                text={opt.text}
                name={id}
                value={opt.id}
                id={opt.id}
                state={opt.isSelected}
                onStateChange={onChange}
              />
            ))
          : null}
      </OptionGroup>
      <div className={`${isDanger() ? 'block' : 'hidden'} text-red-600`}>
        <i className="fa-solid fa-circle-info inline-block mr-1"></i>
        This is a required question.
      </div>
    </div>
  );
};

export default CheckboxJournalInput;
