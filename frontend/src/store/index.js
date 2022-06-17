
import User from '@/models/user'
import Cart from '@/models/cart'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new User({})
  },
  mutations: {
    loading (state) {
      state.networkCallsInProgress += 1
    },
    loaded (state) {
      state.networkCallsInProgress -= 1
    },
    fullsetUser (state, data) {
      const { id, roles, parent, judge, admin, client, superadmin, institute, teacher } = data
      state.user = new User({ id, roles, parent, judge, admin, client, superadmin, institute, teacher })
    },
    unsetUserData (state) {
      state.user = new User({})
      state.allCompetitions = []
      state.allTeacherCompetitions = []
      state.enrolledCompetitions = []
      state.enrolledActivities = []
      state.participants = []
      state.instituteparticipants = []
      state.mentors = []
      state.teachers = []
      state.subscriptions = []
      state.institutes = []
      state.clients = []
      state.templates = []
      state.teacherTemplates = []
      state.cart = new Cart()
    },
    setParent (state, data) {
      const { id, name, mobile, email, address } = data
      state.user = state.user.setParent({ id, name, mobile, email, address })
    },
    setJudge (state, data) {
      const { id, name, mobile, email, address, cat, subcat } = data
      state.user = state.user.setJudge({ id, name, mobile, email, address, cat, subcat })
    },
    setAdmin (state, data) {
      const { id, name, mobile, email, address, cat, subcat } = data
      state.user = state.user.setAdmin({ id, name, mobile, email, address, cat, subcat })
    },
    setUserData (state, data) {
      state.user = state.user.setData(data)
    },
    setAllCompetitions (state, competitions) {
      state.allCompetitions = competitions
    },
    setAllTeacherCompetitions (state, competitions) {
      state.allTeacherCompetitions = competitions
    },
    setAllCompetitionsSeries (state, series) {
      state.allCompetitionsSeries = series
    },
    setSeries (state, series) {
      if (series.length !== 0) {
        state.series = series.records
      }
    },
    setTeacherSeries (state, series) {
      if (series.length !== 0) {
        state.teacherSeries = series.records
      }
    },
    setEnrolledCompetitions (state, competitions) {
      state.enrolledCompetitions = competitions
    },
    setEnrolledActivities (state, competitions) {
      state.enrolledActivities = competitions
    },
    setEnrolledSeries (state, series) {
      state.enrolledSeries = series
    },
    setParticipants (state, participants) {
      state.participants = participants
    },
    setInstituteParticipants (state, participants) {
      state.instituteparticipants = participants
    },
    setMentors (state, mentors) {
      state.mentors = mentors
    },
    setTemplates (state, templates) {
      state.templates = templates
    },
    setTeacherTemplates (state, templates) {
      state.teacherTemplates = templates
    },
    setClients (state, clients) {
      state.clients = clients
    },
    setInstitutes (state, institutes) {
      state.institutes = institutes
    },
    setTeachers (state, teachers) {
      state.teachers = teachers
    },
    setSubscriptions (state, subscriptions) {
      state.subscriptions = subscriptions
    },
    enrollIn (state, { competitionId, participantIds }) {
      // console.log(competitionId+"----"+participantIds )
      state.cart = state.cart.enroll({ competitionId, participantIds })
    },
    enrollInSeries (state, { seriesId, participantIds }) {
      state.cart = state.cart.enrollInSeries({ seriesId, participantIds })
    },
    removeFromCart (state, competitionId) {
      state.cart = state.cart.deleteComp(competitionId)
    },
    removeSeriesFromCart (state, seriesId) {
      state.cart = state.cart.deleteSeries(seriesId)
    },
    removeParticipantFromCompetition (state, { participantId, competitionId }) {
      state.cart = state.cart.unenroll({ competitionId, participantId })
    },
    removeParticipantFromSeries (state, { participantId, seriesId }) {
      state.cart = state.cart.unenrollFromSeries({ seriesId, participantId })
    },
    clearCart (state) {
      state.cart = new Cart([])
    },
    setRazorpayOrder (state, order) {
      state.cart = state.cart.setRazorpayOrder(order)
    },
    toggleTermsAndConditions (state, termsAndConditions) {
      state.cart = state.cart.setTermsAndConditions(termsAndConditions)
    }
  },
  actions: {
    loadUser ({ commit, state }) {
      return UsersService.get(state.user).then((p) => commit('setUserData', p))
    },
    loadAllCompetitions ({ commit, state }) {
      return (state.user.isParent()
        ? ParentsService.getAllCompetitions() : ClientsService.getAllCompetitions()
      )
        .then(c => commit('setAllCompetitions', c))
    },
    loadSeries ({ commit, state }) {
      return ClientsService.listSeries()
        .then(c => commit('setSeries', c))
    },
    loadTeacherSeries ({ commit, state }) {
      return TeachersService.listSeries()
        .then(c => commit('setTeacherSeries', c))
    },
    loadEnrolledCompetitions ({ commit, state }) {
      return (state.user.isParent()
        ? ParentsService.getEnrolledCompetitions(state.user.getParentId())
        : ClientsService.getEnrolledCompetitions(state.user.getClientId())
      )
        .then(c => commit('setEnrolledCompetitions', c))
    },
    loadEnrolledActivities ({ commit, state }) {
      return TeachersService.getEnrolledCompetitions(state.user.getTeacherId())
        .then(c => commit('setEnrolledActivities', c))
    },
    loadEnrolledSeries ({ commit, state }) {
      return ClientsService.getEnrolledSeries(state.user.getClientId())
        .then(c => commit('setEnrolledSeries', c))
    },
    loadTeacherEnrolledSeries ({ commit, state }) {
      return TeachersService.getEnrolledSeries(state.user.getTeacherId())
        .then(c => commit('setEnrolledSeries', c))
    },
    loadParticipants ({ commit, state }) {
      return (state.user.isParent()
        ? ParentsService.getParticipants(state.user.getParentId())
        : ClientsService.getAllParticipants(state.user.getClientId()))
        .then(p => commit('setParticipants', p))
    },
    loadMentors ({ commit, state }) {
      return (state.user.isClient()
        ? ClientsService.getMentors(state.user.getClientId())
        : AdminsService.getMentors())
        .then(p => commit('setMentors', p))
    },
    loadInstituteMentors ({ commit, state }) {
      return (state.user.isInstitute()
        ? ClientsService.getInstituteMentors(state.user.getInstituteId())
        : AdminsService.getMentors())
        .then(p => commit('setMentors', p))
    },
    loadInstituteTeachers ({ commit, state }) {
      return TeachersService.getTeachers(state.user.getInstituteId())
        .then(p => commit('setTeachers', p))
    },
    loadInstituteSubscription ({ commit, state }) {
      return InstitutesService.getSubscriptions(state.user.getInstituteId())
        .then(p => commit('setSubscriptions', p))
    },
    loadClients ({ commit, state }) {
      return AdminsService.getClients()
        .then(p => commit('setClients', p))
    },
    loadInstitutes ({ commit, state }) {
      return AdminsService.getInstitutes()
        .then(p => commit('setInstitutes', p))
    },
    loadParents ({ commit, state }) {
      return ClientsService.getClients()
        .then(p => commit('setParent', p))
    },
    loadClientCompetitions ({ commit }) {
      return ClientsService.getAllCompetitions()
        .then(c => commit('setAllCompetitions', c))
    },
    loadTeacherActivities ({ commit, state }) {
      return TeachersService.getAllTeacherCompetitions(state.user.getTeacherId())
        .then(c => commit('setAllTeacherCompetitions', c))
    },
    loadClientCompetitionsSeries ({ commit }) {
      return ClientsService.getAllCompetitionsSeries()
        .then(c => commit('setAllCompetitionsSeries', c))
    },
    loadClientParticipants ({ commit, state }) {
      return ClientsService.getAllParticipants(state.user.getClientId())
        .then(c => commit('setParticipants', c))
    },
    loadTeacherParticipants ({ commit, state }) {
      // console.log(state.user)
      return TeachersService.getAllParticipants(state.user.getTeacherId())
        .then(c => commit('setInstituteParticipants', c))
    },
    loadClientEnrolledCompetitions ({ commit, state }) {
      return ClientsService.getEnrolledCompetitions(state.user.getClientId())
        .then(c => commit('setEnrolledCompetitions', c))
    },
    loadInstituteParticipants ({ commit, state }) {
      return ClientsService.getAllInstituteParticipants(state.user.getInstituteId())
        .then(c => commit('setParticipants', c))
    },
    saveMentor ({ commit, state, dispatch }, data) {
      return (state.user.isClient()
        ? ClientsService.addMentor(state.user.getClientId(), data)
        : AdminsService.addMentor(data))
        .then(() => dispatch('loadMentors'))
    },
    saveInstituteMentor ({ commit, state, dispatch }, data) {
      return (state.user.isInstitute()
        ? InstitutesService.addMentor(state.user.getInstituteId(), data)
        : AdminsService.addMentor(data))
        .then(() => dispatch('loadInstituteMentors'))
    },
    deleteMentor ({ commit, state, dispatch }, mentorId) {
      return (state.user.isClient()
        ? ClientsService.deleteMentor(state.user.getClientId(), mentorId)
        : AdminsService.deleteMentor(mentorId))
        .then(() => dispatch('loadMentors'))
    },
    loadTemplates ({ commit, state }) {
      return (state.user.isClient()
        ? ClientsService.getTemplates(state.user.getClientId())
        : AdminsService.getTemplates())
        .then(p => commit('setTemplates', p))
    },
    loadTeacherTemplates ({ commit, state }) {
      // console.log(state.user.isTeacher())
      return TeachersService.getTeacherTemplates(state.user.getTeacherId())
        .then(p => commit('setTeacherTemplates', p))
    }
  },
  modules: {
  },
  getters: {
    sortedCompetitions: state => {
      const descTimeBasedSorter = (a, b) => b.date - a.date
      return state.allCompetitions.sort(descTimeBasedSorter)
    },
    sortedTeacherCompetitions: state => {
      const descTimeBasedSorter = (a, b) => b.date - a.date
      return state.allTeacherCompetitions.sort(descTimeBasedSorter)
    },
    sortedCompetitionsSeries: state => {
      const descTimeBasedSorter = (a, b) => b.date - a.date
      return state.allCompetitionsSeries.sort(descTimeBasedSorter)
    },
    sortedSeries: state => {
      const descTimeBasedSorter = (a, b) => b.reg_start - a.reg_start
      return state.series.sort(descTimeBasedSorter)
    },
    sortedTeacherSeries: state => {
      const descTimeBasedSorter = (a, b) => b.reg_start - a.reg_start
      return state.teacherSeries.sort(descTimeBasedSorter)
    }
  }
})
