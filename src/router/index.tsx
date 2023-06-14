import React from 'react';
import Root from 'pages/Employer/Root';
import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/Employer/Home';
import Personals from 'pages/Employer/Personals';
import PersonalDetail from 'pages/Employer/PersonalDetail';
import Auth from 'pages/Employer/Auth/Auth';
import Registration from 'pages/Employer/Auth/Registration';
import CreateEditCompany from 'pages/Employer/CreateEditCompany';
import Company from 'pages/Employer/Company';
import MyVacacies from 'pages/Employer/MyVacancies';
import EmployerChat from 'pages/Employer/EmployerChat';
import ChatBody from 'pages/Employer/EmployerChat/chat';
import MyVacaciesCreate from 'pages/Employer/MyVacancies/create';
import Vacancies from 'pages/Employer/MyVacancies/vacancies';
import Responses from 'pages/Employer/MyVacancies/responses';
import SearchCandidates from 'pages/Employer/SearchForCandidates';

export default createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'personals',
        element: <Personals />,
      },
      {
        path: 'personals/:personalId',
        element: <PersonalDetail />,
      },
      {
        path: 'my-company',
        element: <Company />,
      },
      {
        path: 'chat',
        element: <EmployerChat />,
        children: [
          {
            path: ':chatId',
            element: <ChatBody />,
          },
        ],
      },
      {
        path: 'serach-candidates',
        element: <SearchCandidates />,
      },
      {
        path: 'my-vacancies',
        element: <MyVacacies />,
        children: [
          {
            path: 'create',
            element: <MyVacaciesCreate />,
          },
          {
            path: 'responses',
            element: <Responses />,
          },
          {
            path: 'active',
            element: <Vacancies status="ACTIVE" />,
          },
          {
            path: 'closed',
            element: <Vacancies status="CLOSED" />,
          },
          {
            path: 'archive',
            element: <Vacancies status="ARCHIVED" />,
          },
        ],
      },
    ],
  },
  {
    path: 'account/auth',
    element: <Auth />,
  },
  {
    path: 'account/registr',
    element: <Registration />,
  },
  {
    path: 'account/create-edit',
    element: <CreateEditCompany />,
  },
]);
