import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { AverageRating } from './AverageRating';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import { I18nextProvider } from 'react-i18next';
import i18nForTest from 'utils/i18nForTest';
import { NotificationToastContainer } from 'components/NotificationToast/NotificationToast';
import { describe, expect, it } from 'vitest';
import { nonEmptyProps } from '../../EventStatsMocks';
import common from '../../../../../public/locales/en/common.json';

describe('Testing Average Rating Card', () => {
  it('The component should be rendered and the Score should be shown', async () => {
    const { queryByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18nForTest}>
            <NotificationToastContainer />
            <AverageRating {...nonEmptyProps} />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>,
    );

    await waitFor(() =>
      expect(queryByText(common.averageReviewScore)).toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(
        queryByText(common.ratedScore.replace('{{score}}', '5.00')),
      ).toBeInTheDocument(),
    );
  });
});
