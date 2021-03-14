import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { getClients, inputProp } from 'forms/transaction/utils';
import { optionProps } from 'forms/shared/types';
import FieldAutoComplete from 'forms/shared/fields/autocomplete';
import useSharedStyles from 'forms/shared/styles';

const FieldClients = () => {
  const sharedClasses = useSharedStyles();

  const [clients, setClients] = useState<{
    data?: optionProps[], fetching?: boolean,
  }>({ data: [], fetching: false });

  const [keyword, setKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (keyword) {
      setClients({ data: [], fetching: true });
      getClients({ keyword }).then((data) => {
        setClients({ data: [...data], fetching: false });
      });
    }
  }, [keyword]);

  return (
    <Box className={sharedClasses.groupedFieldsContainer}>
      <FieldAutoComplete
        name="client"
        textInputProps={{
          onChange: ({ currentTarget }) => setKeyword(currentTarget.value),
          ...inputProp('Client', true),
        }}
        options={clients.data}
        onClose={() => setClients({ data: [], fetching: false })}
        onOpen={() => {
          setClients({ data: [], fetching: true });
          getClients({}).then((data) => {
            setClients({ data: [...data], fetching: false });
          });
        }}
        fetching={clients.fetching}
        loading={clients.fetching}
        style={{ flex: 1 }}
      />
    </Box>
  );
};

export default FieldClients;
