import streamlit as st
from openai import OpenAI
# from dotenv import load_dotenv
import streamlit.components.v1 as components


# # Load environment variables
# load_dotenv()

class SimpleLLMChat:
    def __init__(self, temperature=0.7, top_p=1.0):
        self.temperature = temperature
        self.top_p = top_p
        self.llm = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

    def chat(self, query, chat_history=None):
        try:
            messages = [{"role": "system", "content": "You are a helpful assistant who knows and expert in Business and other related works."}]
            if chat_history:
                for pair in chat_history:
                    messages.append({"role": "user", "content": pair["user"]})
                    messages.append({"role": "assistant", "content": pair["bot"]})
            messages.append({"role": "user", "content": query})
            response = self.llm.chat.completions.create(
                model="llama3.2",
                temperature=self.temperature,
                top_p=self.top_p,
                messages=messages,
            )
            return response.choices[0].message.content
        except Exception as e:
            st.error(f"Error generating response: {str(e)}")
            return None

def main():
    st.set_page_config(page_title="LLM Chat Assistant", layout="wide")
    st.title("🤖 FinnoBot")

    if "llm_chat" not in st.session_state:
        st.session_state.llm_chat = SimpleLLMChat()

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    llm_chat = st.session_state.llm_chat

    # Sidebar controls
    st.sidebar.title("⚙️ Settings")
    temperature = st.sidebar.slider("Temperature (Randomness)", 0.0, 1.0, 0.7, 0.05)
    top_p = st.sidebar.slider("Top-p (Nucleus sampling)", 0.0, 1.0, 1.0, 0.05)

    llm_chat.temperature = temperature
    llm_chat.top_p = top_p

    st.sidebar.markdown("---")
    st.sidebar.subheader("💡 Tips")
    st.sidebar.write("- Ask anything to the LLM.")
    st.sidebar.write("- Keep it conversational for better results.")

    # Spacer to push the button to bottom
    st.sidebar.markdown(" " * 20, unsafe_allow_html=True)
    st.sidebar.markdown("##")  # Space

    # Use empty container to align to bottom
    with st.sidebar.container():
        st.markdown("##")
        components.html("""
            <script>
                function goBack() {
                    window.history.back();
                }
            </script>
            <button onclick="goBack()" style="
                width: 100%;
                padding: 0.75em;
                background-color: #0e1117;
                color: #ffffff;
                text-align: center;
                border-radius: 10px;
                border: 2px solid #3ee3e2;
                font-weight: bold;
                cursor: pointer;
                transition: 0.3s;
            " onmouseover="this.style.backgroundColor='#3ee3e2'; this.style.color='#0e1117';"
            onmouseout="this.style.backgroundColor='#0e1117'; this.style.color='#ffffff';">
                🔙 Go Back
            </button>
        """, height=100)



    user_query = st.chat_input("Ask your question here...")

    if user_query:
        with st.spinner("Thinking..."):
            response = llm_chat.chat(user_query, chat_history=st.session_state.chat_history)
            if response:
                st.session_state.chat_history.append({"user": user_query, "bot": response})

    for pair in st.session_state.chat_history:
        with st.container():
            col1, col2 = st.columns([8, 2])
            with col1:
                st.markdown("**You:**")
                st.write(pair["user"])
        with st.container():
            col1, col2 = st.columns([2, 8])
            with col2:
                st.markdown("**Assistant:**")
                st.markdown(pair["bot"])

if __name__ == "__main__":
    main()
