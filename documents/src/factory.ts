import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';

import { IModelDB } from '@jupyterlab/observables';

import { Contents } from '@jupyterlab/services';

import { ExampleDocWidget, ExamplePanel } from './widget';

import { ExampleDocModel } from './model';

/**
 * A widget factory to create new instances of ExampleDocWidget.
 */
export class ExampleWidgetFactory extends ABCWidgetFactory<
  ExampleDocWidget,
  ExampleDocModel
> {
  /**
   * Constructor of ExampleWidgetFactory.
   *
   * @param options
   */
  constructor(options: DocumentRegistry.IWidgetFactoryOptions) {
    super(options);
  }

  /**
   * Create a new widget given a context.
   *
   * @param context: Contains the information of the file
   */
  protected createNewWidget(
    context: DocumentRegistry.IContext<ExampleDocModel>
  ): ExampleDocWidget {
    return new ExampleDocWidget({
      context,
      content: new ExamplePanel(context)
    });
  }
}

/**
 * A Model factory to create new instances of ExampleDocModel.
 */
export class ExampleDocModelFactory
  implements DocumentRegistry.IModelFactory<ExampleDocModel> {
  /**
   * The name of the model.
   */
  get name(): string {
    return 'example-model';
  }

  /**
   * The content type of the file.
   */
  get contentType(): Contents.ContentType {
    return 'file';
  }

  /**
   * The format of the file.
   */
  get fileFormat(): Contents.FileFormat {
    return 'text';
  }

  /**
   * Get whether the model factory has been disposed.
   */
  get isDisposed(): boolean {
    return this._disposed;
  }

  /**
   * Dispose the model factory.
   */
  dispose(): void {
    this._disposed = true;
  }

  /**
   * Get the preferred language given the path on the file.
   *
   * @param path: path of the file represented by this document model
   */
  preferredLanguage(path: string): string {
    return '';
  }

  /**
   * Create a new instance of ExampleDocModel.
   *
   * @param languagePreference
   *
   * @param modelDB
   */
  createNew(languagePreference?: string, modelDB?: IModelDB): ExampleDocModel {
    return new ExampleDocModel(languagePreference, modelDB);
  }

  private _disposed = false;
}
