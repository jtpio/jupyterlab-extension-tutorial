import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { ITranslator } from '@jupyterlab/translation';

import { SignalExamplePanel } from './panel';

/**
 * The command IDs used by the console plugin.
 */
namespace CommandIDs {
  export const create = 'examples-signals:create';
}

/**
 * Initialization data for the extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/signals:plugin',
  description: 'A minimal JupyterLab example using signals.',
  autoStart: true,
  optional: [ILauncher],
  requires: [ICommandPalette, ITranslator],
  activate
};

/**
 * Activate the JupyterLab extension.
 *
 * @param app Jupyter Font End
 * @param palette Jupyter Commands Palette
 * @param translator Jupyter Translator
 * @param launcher [optional] Jupyter Launcher
 */
function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  translator: ITranslator,
  launcher: ILauncher | null
): void {
  const manager = app.serviceManager;
  const { commands, shell } = app;
  const category = 'Extension Examples';
  const trans = translator.load('jupyterlab');

  // Add launcher
  if (launcher) {
    launcher.add({
      command: CommandIDs.create,
      category: category
    });
  }

  /**
   * Creates a example panel.
   *
   * @returns The panel
   */
  function createPanel(): Promise<SignalExamplePanel> {
    let panel: SignalExamplePanel;
    return manager.ready.then(() => {
      panel = new SignalExamplePanel(translator);
      shell.add(panel, 'main');
      return panel;
    });
  }

  // Add commands to registry
  commands.addCommand(CommandIDs.create, {
    label: trans.__('Open the Signal Example Panel'),
    caption: trans.__('Open the Signal Example Panel'),
    execute: createPanel
  });

  // Add items in command palette and menu
  palette.addItem({ command: CommandIDs.create, category });
}

export default extension;
