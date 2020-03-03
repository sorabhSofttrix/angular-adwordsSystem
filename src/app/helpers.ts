declare var $: any;

export class Helpers {

  static setLoading(loading) {
    if (loading) {
      $('.preloader-backdrop').fadeIn(200);
    } else {
      $('.preloader-backdrop').fadeOut(200);
    }
  }

  static initLayout() {
    // SIDEBAR ACTIVATE METISMENU
    $('.metismenu').metisMenu();

    // SIDEBAR TOGGLE ACTION
    $('.js-sidebar-toggler').click(function () {
      $('body').toggleClass('sidebar-mini');
    });
  }

  static bodyClass(Class) {
    $('body').attr('class', Class);
  }

  static initPage() {
    // Activate slimscroll
    $('.scroller').each(function () {
      $(this).slimScroll({
        height: $(this).attr('data-height'),
        color: $(this).attr('data-color'),
        railOpacity: '0.9',
      });
    });

    $('.slimScrollBar').hide();

    $(".ibox-collapse").click(function () {
      $(this).closest("div.ibox").toggleClass("collapsed-mode").children(".ibox-body").slideToggle(200)
    });
  }

  static toggleSilverPanel(isAdd: boolean) {
    if (isAdd) {
      $('body').addClass('empty-layout bg-silver-300');
    } else {
      $('body').removeClass('empty-layout bg-silver-300');
    }
  }

  static getElement(name) {
    return $(name).html();
  }


  static initSummerNote(data: string) {
    $('#summernote').summernote({
      height: 600
    });
    if (data) $("#summernote").summernote("code", data);
  }

  static getSummerNote() {
    return $('#summernote').summernote('code');
  }


}
