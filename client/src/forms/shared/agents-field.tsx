import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { getAgents, inputProp } from 'forms/transaction/utils';
import { optionProps } from 'forms/shared/types';
import FieldAutoComplete from 'forms/shared/fields/autocomplete';
import useSharedStyles from 'forms/shared/styles';

const FieldAgents = () => {
  const sharedClasses = useSharedStyles();

  const [agents, setAgents] = useState<{
    data?: optionProps[], fetching?: boolean,
  }>({ data: [], fetching: false });

  const [keyword, setKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (keyword) {
      setAgents({ data: [], fetching: true });
      getAgents({ keyword }).then((data) => {
        setAgents({ data: [...data], fetching: false });
      });
    }
  }, [keyword]);

  return (
    <Box className={sharedClasses.groupedFieldsContainer}>
      <FieldAutoComplete
        name="agent"
        textInputProps={{
          onChange: ({ currentTarget }) => setKeyword(currentTarget.value),
          ...inputProp('Agent', true),
        }}
        options={agents.data}
        onClose={() => setAgents({ data: [], fetching: false })}
        onOpen={() => {
          setAgents({ data: [], fetching: true });
          getAgents({}).then((data) => {
            setAgents({ data: [...data], fetching: false });
          });
        }}
        fetching={agents.fetching}
        loading={agents.fetching}
        style={{ flex: 1 }}
      />
    </Box>
  );
};

export default FieldAgents;
