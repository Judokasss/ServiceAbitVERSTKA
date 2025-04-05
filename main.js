function toggleContent(type) {
  const content = document.getElementById(`${type}Content`);
  const parent = content.closest('.action-item');

  // Переключаем класс активности
  parent.classList.toggle('active');

  // Управляем высотой
  if (parent.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = null;
  }
}

// Оставить комм
function handleComment(action, element) {
  const container = element.closest('.call-entry');
  let commentSection = container.querySelector('.comment-section');
  let existingComment = commentSection?.querySelector('.existing-comment');

  // Получаем текущий комментарий, если он есть
  let currentComments = existingComment ? existingComment.innerHTML : '';

  // Запрос нового комментария у пользователя
  const newComment = prompt(
    action === 'edit' ? 'Дополните комментарий:' : 'Добавьте комментарий:',
    ''
  );

  if (newComment) {
    // Добавляем метку времени
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now
      .toLocaleTimeString()
      .slice(0, 5)}`;
    const formattedComment = `${timestamp} - ${newComment}\n${currentComments}`;

    if (!commentSection) {
      // Создаем новый блок комментариев
      commentSection = document.createElement('div');
      commentSection.className = 'comment-section';
      commentSection.innerHTML = `
          <span class="existing-comment">${formattedComment}</span>
          <button class="comment-btn edit" onclick="handleComment('edit', this)">Дополнить <img src="assets/icon/icon-edit.png" class="comment-icon"></button>
      `;
      container.appendChild(commentSection);
    } else {
      // Обновляем существующий комментарий
      existingComment.innerHTML = formattedComment;
    }

    // Удаляем кнопку "Добавить комментарий"
    const addBtn = container.querySelector('.comment-btn:not(.edit)');
    if (addBtn) {
      addBtn.remove();
    }
  }
}

document.addEventListener('click', function (event) {
  const callsContent = document.getElementById('callsContent');
  const commentsContent = document.getElementById('commentsContent');

  // Проверяем, был ли клик внутри .content-wrapper
  const isInsideCalls = callsContent.contains(event.target);
  const isInsideComments = commentsContent.contains(event.target);
  const isCallsButton = event.target.closest('.action-item');

  if (!isInsideCalls && !isCallsButton) {
    callsContent.style.maxHeight = null;
    callsContent.closest('.action-item').classList.remove('active');
  }

  if (!isInsideComments && !isCallsButton) {
    commentsContent.style.maxHeight = null;
    commentsContent.closest('.action-item').classList.remove('active');
  }
});

// Предотвращаем всплытие кликов внутри content-wrapper
document.querySelectorAll('.content-wrapper').forEach((wrapper) => {
  wrapper.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});

// Счетки сколько закр сообщений
document.addEventListener('DOMContentLoaded', function () {
  updatePinnedCount(); // Обновляем счетчик при загрузке

  document.querySelectorAll('.button-fix').forEach((button) => {
    button.addEventListener('click', function () {
      togglePin(this);
    });
  });
});

function togglePin(button) {
  const img = button.querySelector('.fix');
  const isPinned = img.classList.toggle('pinned');

  // Меняем иконку в зависимости от состояния
  img.src = isPinned
    ? 'assets/icon/icons8-pin-50 (3).png' // Иконка закрепленного
    : 'assets/icon/icons8-pin-50 (1).png'; // Иконка обычная

  updatePinnedCount();
}

function updatePinnedCount() {
  const pinnedCount = document.querySelectorAll('.fix.pinned').length;
  const counterElement = document.querySelector('.pinned-counter');
  document.getElementById('pinnedCount').textContent = pinnedCount;

  // Скрываем, если закрепленных нет
  counterElement.style.display = pinnedCount > 0 ? 'block' : 'none';
}
