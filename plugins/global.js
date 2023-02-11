// Кнопка назад (если в контексте есть куда вернуться то идем нативно, либо идем в extraPath)
// extraPath -> роут в который надо вернуться если у пользователя нет истории
const goBack = ({router, context}, extraPath) => {
  if (context.from) router.go(-1);
  else router.push(extraPath);
}

export default function ({app}, inject) {
  inject("goBack", extraPath => goBack(app, extraPath))
  inject("isMobile", window.innerWidth < 800);
}
