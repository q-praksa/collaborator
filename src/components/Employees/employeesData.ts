import { EmployeeStatus, EmployeeRole } from './types';

const employees = [
    {
        id: '1',
        fullname: 'Kim Novak',
        status: EmployeeStatus.busy,
        job: 'Sensei',
        role: EmployeeRole.admin,
        img: 'https://i.ibb.co/y6Wh1gh/kn.png',
    },
    {
        id: '2',
        fullname: 'Bojana Buljic',
        status: EmployeeStatus.available,
        job: 'Full-Stack',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/F3H3NnL/bb.png',
    },
    {
        id: '3',
        fullname: 'Laza Ivosevic',
        status: EmployeeStatus.available,
        job: 'Front-End',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/8D6xCSk/li.png',
    },
    {
        id: '4',
        fullname: 'Vuk Stojanovic',
        status: EmployeeStatus.busy,
        job: 'DevOps',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/0QxRH1v/vs.png',
    },
    {
        id: '5',
        fullname: 'Stefan Meza',
        status: EmployeeStatus.available,
        job: 'Front-End',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/0VZwYKP/sm.png',
    },
    {
        id: '6',
        fullname: 'Milan Jovanovic',
        status: EmployeeStatus.available,
        job: 'Front-End',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/fns9KG5/mj.png',
    },
    {
        id: '7',
        fullname: 'Miljana Jankovic',
        status: EmployeeStatus.busy,
        job: 'QA',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/61XbtgP/mb.png',
    },
    {
        id: '8',
        fullname: 'Srecko Stojic',
        status: EmployeeStatus.busy,
        job: 'Back-End',
        role: EmployeeRole.user,
        img: 'https://i.ibb.co/XJWsBCL/ss.png',
    },
];

export default employees;
