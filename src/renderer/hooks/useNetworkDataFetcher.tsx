import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  BANK_ACCOUNTS,
  BANK_BANKS,
  BANK_BANK_TRANSACTIONS,
  BANK_BLOCKS,
  BANK_CONFIGS,
  BANK_CONFIRMATION_BLOCKS,
  BANK_INVALID_BLOCKS,
  BANK_VALIDATORS,
  BANK_VALIDATOR_CONFIRMATION_SERVICES,
  VALIDATOR_ACCOUNTS,
  VALIDATOR_BANKS,
  VALIDATOR_BANK_TRANSACTIONS,
  VALIDATOR_BLOCKS,
  VALIDATOR_CONFIGS,
  VALIDATOR_CONFIRMATION_BLOCKS,
  VALIDATOR_INVALID_BLOCKS,
  VALIDATOR_VALIDATORS,
  VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES,
} from '@renderer/constants';
import {
  fetchBankAccounts,
  fetchBankBanks,
  fetchBankBankTransactions,
  fetchBankBlocks,
  fetchBankConfig,
  fetchBankConfirmationBlocks,
  fetchBankInvalidBlocks,
  fetchBankValidatorConfirmationServices,
  fetchBankValidators,
} from '@renderer/dispatchers/banks';
import {
  fetchValidatorAccounts,
  fetchValidatorBanks,
  fetchValidatorBankTransactions,
  fetchValidatorBlocks,
  fetchValidatorConfig,
  fetchValidatorConfirmationBlocks,
  fetchValidatorInvalidBlocks,
  fetchValidatorValidatorConfirmationServices,
  fetchValidatorValidators,
} from '@renderer/dispatchers/validators';
import {
  unsetBankAccounts,
  unsetBankBanks,
  unsetBankBankTransactions,
  unsetBankBlocks,
  unsetBankConfirmationBlocks,
  unsetBankInvalidBlocks,
  unsetBankValidatorConfirmationServices,
  unsetBankValidators,
} from '@renderer/store/banks';
import {
  unsetValidatorAccounts,
  unsetValidatorBanks,
  unsetValidatorBankTransactions,
  unsetValidatorBlocks,
  unsetValidatorConfirmationBlocks,
  unsetValidatorInvalidBlocks,
  unsetValidatorValidatorConfirmationServices,
  unsetValidatorValidators,
} from '@renderer/store/validators';
import {AppDispatch} from '@renderer/types';

import useAddress from './useAddress';

const getDispatcherFromType = (type: string) => {
  switch (type) {
    case BANK_ACCOUNTS:
      return fetchBankAccounts;
    case BANK_BANKS:
      return fetchBankBanks;
    case BANK_BANK_TRANSACTIONS:
      return fetchBankBankTransactions;
    case BANK_BLOCKS:
      return fetchBankBlocks;
    case BANK_CONFIGS:
      return fetchBankConfig;
    case BANK_CONFIRMATION_BLOCKS:
      return fetchBankConfirmationBlocks;
    case BANK_INVALID_BLOCKS:
      return fetchBankInvalidBlocks;
    case BANK_VALIDATORS:
      return fetchBankValidators;
    case BANK_VALIDATOR_CONFIRMATION_SERVICES:
      return fetchBankValidatorConfirmationServices;
    case VALIDATOR_ACCOUNTS:
      return fetchValidatorAccounts;
    case VALIDATOR_BANKS:
      return fetchValidatorBanks;
    case VALIDATOR_BANK_TRANSACTIONS:
      return fetchValidatorBankTransactions;
    case VALIDATOR_BLOCKS:
      return fetchValidatorBlocks;
    case VALIDATOR_CONFIGS:
      return fetchValidatorConfig;
    case VALIDATOR_CONFIRMATION_BLOCKS:
      return fetchValidatorConfirmationBlocks;
    case VALIDATOR_INVALID_BLOCKS:
      return fetchValidatorInvalidBlocks;
    case VALIDATOR_VALIDATORS:
      return fetchValidatorValidators;
    case VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES:
      return fetchValidatorValidatorConfirmationServices;
    default:
      throw new Error();
  }
};

const getUnsetActionCreatorFromType = (type: string) => {
  switch (type) {
    case BANK_ACCOUNTS:
      return unsetBankAccounts;
    case BANK_BANKS:
      return unsetBankBanks;
    case BANK_BANK_TRANSACTIONS:
      return unsetBankBankTransactions;
    case BANK_BLOCKS:
      return unsetBankBlocks;
    // case BANK_CONFIGS:
    //   return unsetBankC;
    case BANK_CONFIRMATION_BLOCKS:
      return unsetBankConfirmationBlocks;
    case BANK_INVALID_BLOCKS:
      return unsetBankInvalidBlocks;
    case BANK_VALIDATORS:
      return unsetBankValidators;
    case BANK_VALIDATOR_CONFIRMATION_SERVICES:
      return unsetBankValidatorConfirmationServices;
    case VALIDATOR_ACCOUNTS:
      return unsetValidatorAccounts;
    case VALIDATOR_BANKS:
      return unsetValidatorBanks;
    case VALIDATOR_BANK_TRANSACTIONS:
      return unsetValidatorBankTransactions;
    case VALIDATOR_BLOCKS:
      return unsetValidatorBlocks;
    // case VALIDATOR_CONFIGS:
    //   return ;
    case VALIDATOR_CONFIRMATION_BLOCKS:
      return unsetValidatorConfirmationBlocks;
    case VALIDATOR_INVALID_BLOCKS:
      return unsetValidatorInvalidBlocks;
    case VALIDATOR_VALIDATORS:
      return unsetValidatorValidators;
    case VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES:
      return unsetValidatorValidatorConfirmationServices;
    default:
      throw new Error();
  }
};

const useNetworkDataFetcher = (type: string): boolean => {
  const [loading, setLoading] = useState<boolean>(true);
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      await dispatch(getDispatcherFromType(type)(address));
      setLoading(false);
    };

    fetchData();

    return () => {
      if (type !== BANK_CONFIGS && type !== VALIDATOR_CONFIGS) {
        dispatch(getUnsetActionCreatorFromType(type)({address}));
      }
    };
  }, [address, dispatch, type]);

  return loading;
};

export default useNetworkDataFetcher;
