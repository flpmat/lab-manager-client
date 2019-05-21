declare let $: any;

//Helper para tratar dropdowns, de modo a limpar o código de componentes que usam jqueries com o mesmo propósito.

export class DropdownsHelper {

  constructor() { }

  static setDropdown(dropdownName: string, dropdownValue: any) {
    $('select[formControlName='+ dropdownName + ']').val(dropdownValue);
    $('select[formControlName='+ dropdownName + ']').change();
  }

  static resetDropdown(dropdownName: string) {
    $('select[formControlName='+ dropdownName + ']').empty;
    $('select[formControlName='+ dropdownName + ']').change();
  }

  static refreshDropdown (dropdownName: string, time: number) {
    setTimeout(function () {
        $('select[formControlName='+dropdownName+']').selectpicker("refresh");
    }, time);
  }

  
  static refreshTable (tableName: string, time: number) {
    setTimeout(function () {
        $('table[id='+tableName+']').selectpicker("refresh");
    }, time);
  }


  static enableDropdown (dropdownName: string, time: number) {
    setTimeout(function () {
      $('select[formControlName='+ dropdownName + ']').prop("disabled", false)
      $('select[formControlName='+ dropdownName + ']').selectpicker("refresh");
    }, time);
  }

  static disableDropdown(dropdownName: string, time: number) {
    setTimeout(function () {
      $('select[formControlName='+ dropdownName + ']').prop("disabled", true)
      $('select[formControlName='+ dropdownName + ']').selectpicker("refresh");
    }, time);
  }

  static getInputValue(inputName: string) : any {
    return $('select[formControlName='+ inputName + ']').val();
  }

  static changeDropdown(dropdownName: string) {
    $('select[formControlName='+ dropdownName + ']').change();
  }
}
