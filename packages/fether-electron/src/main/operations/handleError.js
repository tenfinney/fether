// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import { app, dialog, shell } from 'electron';

import { bugs, name, parity } from '../../../package.json';
import Pino from '../utils/pino';

const pino = Pino();
const logFile = `${app.getPath('userData')}/${name}.log`;

export default (err, message = 'An error occurred.') => {
  pino.error(err);
  dialog.showMessageBox(
    {
      buttons: ['OK', 'Open logs'],
      defaultId: 0,
      detail: `Please attach the following debugging info:
OS: ${process.platform}
Arch: ${process.arch}
Channel: ${parity.channel}
Error: ${err.message}

Please also attach the contents of the following file:
${logFile}`,
      message: `${message} Please file an issue at ${bugs.url}.`,
      title: 'Parity Error',
      type: 'error'
    },
    buttonId => {
      switch (buttonId) {
        case 1:
          shell.openItem(logFile);
          break;
        default:
          app.exit(1);
      }
    }
  );
};