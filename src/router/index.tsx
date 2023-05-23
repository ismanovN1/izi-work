import React from 'react';
import Root from 'pages/Employer/Root';
import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import Home from 'pages/Employer/Home';
import Personals from 'pages/Employer/Personals';
import PersonalDetail from 'pages/Employer/PersonalDetail';
import Auth from 'pages/Employer/Auth/Auth';
import Registration from 'pages/Employer/Auth/Registration';
import SeekerRegistration from 'pages/JoobSeeker/Auth/Registration';
import SeekerAuth from 'pages/JoobSeeker/Auth/Auth';
import CreateEditCompany from 'pages/Employer/CreateEditCompany';
import Company from 'pages/Employer/Company';
import MyVacacies from 'pages/Employer/MyVacancies';
import EmployerChat from 'pages/Employer/EmployerChat';
import ChatBody from 'pages/Employer/EmployerChat/chat';
import MyVacaciesCreate from 'pages/Employer/MyVacancies/create';
import Vacancies from 'pages/Employer/MyVacancies/vacancies';
import Responses from 'pages/Employer/MyVacancies/responses';
import SearchCandidates from 'pages/Employer/SearchForCandidates';
import JoobSeekerRootPage from 'pages/JoobSeeker/JoobSeekerRootPage';
import { isMobile } from 'react-device-detect';
import Main from 'pages/JoobSeeker/Main';
import Job from 'pages/JoobSeeker/Jobs';
import SearchJobInTheCard from 'pages/JoobSeeker/SearchJobInTheMap';
import { vacancies } from 'data/vacancies';
import VacancyDetail from 'pages/JoobSeeker/VacancyDetail';
import Chat from 'pages/JoobSeeker/Chat';
import Account from 'pages/JoobSeeker/Account';
import CreateResume from 'pages/JoobSeeker/Resume/create-resume';
import ResumeRoot from 'pages/JoobSeeker/Resume';
import MyResume from 'pages/JoobSeeker/Resume/my-resume';
import Profile from 'pages/JoobSeeker/profile';

export default createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Root />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //     {
  //       path: 'personals',
  //       element: <Personals />,
  //     },
  //     {
  //       path: 'personals/:personalId',
  //       element: <PersonalDetail />,
  //     },
  //     {
  //       path: 'my-company',
  //       element: <Company />,
  //     },
  //     {
  //       path: 'chat',
  //       element: <EmployerChat />,
  //       children: [
  //         {
  //           path: ':chatId',
  //           element: <ChatBody />,
  //         },
  //       ],
  //     },
  //     {
  //       path: 'serach-candidates',
  //       element: <SearchCandidates />,
  //     },
  //     {
  //       path: 'my-vacancies',
  //       element: <MyVacacies />,
  //       children: [
  //         {
  //           path: 'create',
  //           element: <MyVacaciesCreate />,
  //         },
  //         {
  //           path: 'responses',
  //           element: <Responses />,
  //         },
  //         {
  //           path: 'active',
  //           element: <Vacancies status="ACTIVE" />,
  //         },
  //         {
  //           path: 'closed',
  //           element: <Vacancies status="CLOSED" />,
  //         },
  //         {
  //           path: 'archive',
  //           element: <Vacancies status="ARCHIVED" />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/',
    element: <JoobSeekerRootPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'auth',
        element: <SeekerAuth />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'resume',
        element: <ResumeRoot />,
        children: [
          {
            index: true,
            element: <MyResume />,
          },
          {
            path: 'create-edit',
            element: <CreateResume />,
          },
        ],
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'registr',
        element: <SeekerRegistration />,
      },
      {
        path: 'vacancies',
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <Job />,
          },
          {
            path: ':vacancyId',
            element: <VacancyDetail />,
          },
        ],
      },
      {
        path: 'chat/:chatId',
        element: <Chat />,
      },
      {
        path: 'search-map',
        element: <SearchJobInTheCard />,
      },
    ],
  },
  // {
  //   path: 'account/auth',
  //   element: <Auth />,
  // },
  // {
  //   path: 'account/registr',
  //   element: <Registration />,
  // },
  // {
  //   path: 'account/create-edit',
  //   element: <CreateEditCompany />,
  // },
]);
