import { EditableTableModule } from './editable-table.module';

describe('EditableTableModule', () => {
  let editableTableModule: EditableTableModule;

  beforeEach(() => {
    editableTableModule = new EditableTableModule();
  });

  it('should create an instance', () => {
    expect(editableTableModule).toBeTruthy();
  });
});
