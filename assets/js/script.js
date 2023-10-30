
$(function () {
  var now = dayjs();
  var nowEl = $('#currentDay');
  nowEl.text((now.format('dddd, MMMM D YYYY')));
});
