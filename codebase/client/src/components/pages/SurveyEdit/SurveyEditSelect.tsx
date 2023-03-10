import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import SurveyItem from './SurveyItem';
import Loading from '../../layout/Loading';
import Survey from 'src/model/Survey/Survey';

const SurveyEditSelect: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const navigate = useNavigate();
  const _isMounted = useRef(false); // This flag indicates if this component is mounted, and therefore if we can write to its state

  useEffect(() => {
    _isMounted.current = true;
    // We can't declare the effect callback as async due to race conditions.
    // Instead, we create and call an async helper function.
    (async () => {
      try {
        const surveyArray = await ServerAdapter.fetchAllSurveys();
        if (_isMounted) {
          setSurveys(surveyArray ?? []);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const createSurvey = async () => {
    const newSurvey = await ServerAdapter.createSurvey();
    if (!newSurvey) {
      // TODO
      throw new Error('Offline.');
    }

    navigate(`/survey/admin/id/${newSurvey.id}`);
  };

  return surveys ? (
    <div className="sm:bg-slate-50 sm:pt-5 min-h-screen">
      <div className="sm:pt-7 mt-5 tk-acumin-pro text-gray-600 sm:w-screen-3/5 sm:mx-auto sm:shadow-md sm:shadow-slate-200 sm:rounded-lg bg-white lg:max-w-[560px]">
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Available Surveys
        </h1>

        {surveys.length > 0 ? (
          <>
            <h1 className="mb-7 text-md text-center">
              Choose a survey to edit.
            </h1>
            {surveys.map((survey) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))}
          </>
        ) : (
          <h1 className="mb-7 text-md text-center">
            No surveys available at this time.
          </h1>
        )}

        <hr className="bg-gray-100 h-[0.2px]" />
        <button
          className="block py-7 w-full font-bold text-lg italic bg-inherit cursor-pointer text-center text-blue-400 hover:text-blue-600 hover:bg-gray-50 sm:hover:rounded-lg"
          onClick={createSurvey}
        >
          Create new survey
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SurveyEditSelect;
