const Alerts = createAlerts();

const NaviBar = cc('div', { children: [
    span('cmdcopy'),
    span(' .. '),
    span('Add an entry'),
  ],
});

const NotesInput = createInput();
const CmdInput = createInput();
const SubmitBtn = cc('button', {text: 'Submit'});
const FormAlerts = createAlerts();

// 这个按钮是隐藏不用的，为了防止按回车键提交表单
const HiddenBtn = cc('button', { id: 'submit', text: 'submit' });

const Form = cc('form', { children: [
  createFormItem(NotesInput, 'Notes'),
  createFormItem(CmdInput, 'Command'),
  m(FormAlerts),
  m(HiddenBtn).hide().on('click', e => {
    e.preventDefault();
    return false;
  }),
  m(SubmitBtn).on('click', event => {
    event.preventDefault();
    const notes = valOf(NotesInput, 'trim');
    const cmd = valOf(CmdInput, 'trim');
    if (!notes) {
      FormAlerts.insert('danger', 'Notes必填');
      focus(NotesInput);
      return;
    }
    if (!cmd) {
      FormAlerts.insert('danger', 'Command必填');
      focus(CmdInput);
      return;
    }
    const body = {
      notes: notes,
      cmd: cmd,
    };
    axios.post('/api/add-entry', body)
      .then(() => {
        Form.hide();
        Alerts.insert('success', '成功！');
      })
      .catch(err => {
        Alerts.insert('danger', axiosErrToStr(err));
      })
  }),
]});

$('#root').append(
  m(NaviBar).addClass('my-3'),
  m(Form),
  m(Alerts),
);
