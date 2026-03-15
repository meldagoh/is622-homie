/**
 * chats.js
 * Chat sidebar logic for homie! property listings.
 *
 * Usage:
 *   Include after bootstrap.bundle.min.js:
 *   <script src="../navComponent/chats.js"></script>
 *
 *   Trigger open with:  openChatSidebar()
 *   Trigger close with: closeChatSidebar()
 */

(function () {
  'use strict';

  // ── State ─────────────────────────────────────────────────────
  var agentName   = '';
  var initialized = false;  // has the welcome message been shown yet?
  var hasReplied  = false;  // has the single auto-reply been sent yet?

  var AGENT_REPLY = "Thanks for reaching out! I will be happy to assist you as soon as I am available.";

  // ── Helpers ───────────────────────────────────────────────────
  function getNow() {
    var d = new Date();
    return d.getHours().toString().padStart(2, '0') + ':' +
           d.getMinutes().toString().padStart(2, '0');
  }

  function escHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function scrollBottom() {
    var box = document.getElementById('chatMessages');
    if (box) box.scrollTop = box.scrollHeight;
  }

  // ── Bubble builders ───────────────────────────────────────────
  function addAgentBubble(text) {
    var typing = document.getElementById('chatTyping');
    var box    = document.getElementById('chatMessages');
    if (!box) return;
    var row = document.createElement('div');
    row.className = 'chat-row';
    row.innerHTML =
      '<div class="chat-bubble agent">' +
        '<span class="bubble-text">' + text + '</span>' +
        '<span class="bubble-meta">' + getNow() + '</span>' +
      '</div>';
    box.insertBefore(row, typing);
    scrollBottom();
  }

  function addUserBubble(text) {
    var typing = document.getElementById('chatTyping');
    var box    = document.getElementById('chatMessages');
    if (!box) return;
    var row = document.createElement('div');
    row.className = 'chat-row user-row';
    row.innerHTML =
      '<div class="chat-bubble user">' +
        '<span class="bubble-text">' + escHtml(text) + '</span>' +
        '<span class="bubble-meta">' + getNow() + '</span>' +
      '</div>';
    box.insertBefore(row, typing);
    scrollBottom();
  }

  // ── Typing indicator ──────────────────────────────────────────
  function showTyping() {
    var t = document.getElementById('chatTyping');
    if (t) { t.classList.add('visible'); scrollBottom(); }
  }

  function hideTyping() {
    var t = document.getElementById('chatTyping');
    if (t) t.classList.remove('visible');
  }

  // ── Public API ────────────────────────────────────────────────

  /**
   * initChat(name)
   * Wires up textarea auto-resize / Enter-to-send behaviour
   * Sets the welcome message
   */
  window.initChat = function (name) {
    agentName = name;

    var nameEl = document.getElementById('chatHeaderAgentName');
    if (nameEl) nameEl.textContent = name;

    // Wire textarea
    var inp = document.getElementById('chatInput');
    if (inp) {
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          window.sendChatMessage();
        }
      });
      inp.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
      });
    }
  };

  /**
   * openChatSidebar()
   * Opens the sidebar. Shows the welcome greeting on first open.
   */
  window.openChatSidebar = function () {
    var nameEl = document.getElementById('chatHeaderAgentName');
    if (nameEl) nameEl.textContent = agentName;

    var sidebar = document.getElementById('chatSidebar');
    var overlay = document.getElementById('chatOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');

    if (!initialized) {
      initialized = true;
      setTimeout(function () {
        showTyping();
        setTimeout(function () {
          hideTyping();
          addAgentBubble(
            'Hi there! 👋 Feel free to ask me anything about this property.'
          );
        }, 1200);
      }, 400);
    }

    setTimeout(function () {
      var input = document.getElementById('chatInput');
      if (input) input.focus();
    }, 320);
  };

  /**
   * closeChatSidebar()
   * Closes the sidebar and backdrop.
   */
  window.closeChatSidebar = function () {
    var sidebar = document.getElementById('chatSidebar');
    var overlay = document.getElementById('chatOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  };

  /**
   * sendChatMessage()
   * Posts the user bubble. Sends the single agent reply once only.
   */
  window.sendChatMessage = function () {
    var input = document.getElementById('chatInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;

    addUserBubble(text);
    input.value = '';
    input.style.height = 'auto';

    // Hide quick-reply chips after first message
    var qr = document.getElementById('chatQuickReplies');
    if (qr) qr.style.display = 'none';

    // Send the single auto-reply only on the first user message
    if (!hasReplied) {
      hasReplied = true;
      showTyping();
      setTimeout(function () {
        hideTyping();
        addAgentBubble(AGENT_REPLY);
      }, 1000);
    }
  };

  /**
   * useQuickReply(btn)
   * Pastes the chip text into the input and focuses it.
   */
  window.useQuickReply = function (btn) {
    var input = document.getElementById('chatInput');
    if (input) {
      input.value = btn.textContent.trim();
      input.focus();
    }
  };

})();